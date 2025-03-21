namespace Job.Positions.Api.Services;

public interface IRabbitMqPublisher
{
    Task Publish(string message);
}