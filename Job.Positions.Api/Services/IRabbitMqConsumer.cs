namespace Job.Positions.Api.Services;

public interface IRabbitMqConsumer
{
    Task StartConsuming();
}