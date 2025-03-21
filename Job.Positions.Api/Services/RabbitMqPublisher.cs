using RabbitMQ.Client;
using System.Text;

namespace Job.Positions.Api.Services;

public class RabbitMqPublisher: IRabbitMqPublisher
{
    private readonly string _hostName = "localhost";

    public void Publish(string message)
    {
        var factory = new ConnectionFactory() { HostName = _hostName };
        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel())
        {
            channel.QueueDeclare(queue: "positionsQueue",
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            var body = Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(exchange: "",
                routingKey: "positionsQueue",
                basicProperties: null,
                body: body);
        }
    }
}
