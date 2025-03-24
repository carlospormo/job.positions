using Microsoft.AspNetCore.SignalR;

namespace Job.Positions.Api.Hubs;

public class PositionsHub : Hub
{
    public async Task SendUpdate(string message)
    {
        await Clients.All.SendAsync("ReceiveUpdate", message);
    }
}