using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SlimeRacing.Hubs
{
    public class ChatHub : Hub
    {
        private static volatile int[] _horsePosition = new int[6];

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task MoveIt()
        {
            var ff = Volatile.Read(ref _horsePosition[0]);
            await Clients.All.SendAsync("ReceiveMove");
        }

        public async Task DisableMoveButton()
        {
            await Clients.All.SendAsync("DisableMove");
        }
    }
}