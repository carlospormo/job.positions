using RabbitMQ.Client;
using System.Text;

namespace Job.Positions.Api.Services;

public class RabbitMqPublisher: IRabbitMqPublisher
{
    private readonly string _hostName = "localhost";

    public async Task Publish(string message)
    {
        var factory = new ConnectionFactory() { HostName = _hostName };
        using var connection = await factory.CreateConnectionAsync();
        using var channel = await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(queue: "positionsQueue",
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null);

        var body = Encoding.UTF8.GetBytes(message);

        await channel.BasicPublishAsync(exchange: "",
            routingKey: "positionsQueue",
            body: body);
    }
}
