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
    private readonly IConfiguration _config;

    public RabbitMqConsumer(IHubContext<PositionsHub> hubContext, IConfiguration config)
    {
        _hubContext = hubContext;
        _config = config;
    }

    public async Task StartConsuming()
    {
        var factory = new ConnectionFactory
        {
            HostName = _config["RABBITMQ_HOST"],
            Port = Convert.ToInt32(_config["RABBITMQ_PORT"]),
            UserName = _config["RABBITMQ_USER"],
            Password = _config["RABBITMQ_PASSWORD"]
        };
        await using var connection = await factory.CreateConnectionAsync();
        await using var channel = await connection.CreateChannelAsync();

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