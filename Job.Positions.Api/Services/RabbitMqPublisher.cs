using RabbitMQ.Client;
using System.Text;

namespace Job.Positions.Api.Services;

public class RabbitMqPublisher: IRabbitMqPublisher
{
    private readonly Task<IChannel> _channelTask;

    public RabbitMqPublisher(IConfiguration config)
    {
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

    public async Task Publish(string message)
    {
        var channel = await _channelTask;

        await channel.QueueDeclareAsync(queue: "positions_queue",
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null);

        var body = Encoding.UTF8.GetBytes(message);

        await channel.BasicPublishAsync(exchange: "",
            routingKey: "positions_queue",
            body: body);
    }
}
