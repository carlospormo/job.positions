using RabbitMQ.Client;
using System.Text;

namespace Job.Positions.Api.Services;

public class RabbitMqPublisher: IRabbitMqPublisher
{
    private readonly IConfiguration _config;

    public RabbitMqPublisher(IConfiguration config)
    {
        _config = config;
    }

    public async Task Publish(string message)
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

        var body = Encoding.UTF8.GetBytes(message);

        await channel.BasicPublishAsync(exchange: "",
            routingKey: "positions_queue",
            body: body);
    }
}
