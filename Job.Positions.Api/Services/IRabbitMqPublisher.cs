namespace Job.Positions.Api.Services;

public interface IRabbitMqPublisher
{
    void Publish(string message);
}