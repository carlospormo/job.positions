using System.Diagnostics;
using System.Text;
using Job.Positions.Api.Hubs;
using Microsoft.AspNetCore.SignalR;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Job.Positions.Api.Services;

public class RabbitMqConsumer: IRabbitMqConsumer
{
    private readonly IHubContext<PositionsHub> _hubContext;
    private readonly Task<IChannel> _channelTask;

    public RabbitMqConsumer(IHubContext<PositionsHub> hubContext, IConfiguration config)
    {
        _hubContext = hubContext;

        var factory = new ConnectionFactory
        {
            HostName = config["RABBITMQ_HOST"],
            Port = Convert.ToInt32(config["RABBITMQ_PORT"]),
            UserName = config["RABBITMQ_USER"],
            Password = config["RABBITMQ_PASSWORD"]
        };

        var connectionAsync = factory.CreateConnectionAsync();
        _channelTask = connectionAsync.ContinueWith(task => task.Result.CreateChannelAsync()).Unwrap();
    }

    public async Task StartConsuming()
    {
        var channel = await _channelTask;

        await channel.QueueDeclareAsync(queue: "positions_queue",
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null);

        Debug.WriteLine(" [*] Waiting for messages.");

        var consumer = new AsyncEventingBasicConsumer(channel);
        consumer.ReceivedAsync += async (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            Debug.WriteLine($"Message received: {message}");

            await _hubContext.Clients.All.SendAsync("ReceiveUpdate", message);
        };
        await channel.BasicConsumeAsync(queue: "positions_queue", autoAck: true, consumer: consumer);
    }
}