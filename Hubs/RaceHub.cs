using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SlimeRacing.Hubs
{
    public class RaceHub: Hub
    {
        private static volatile float[] _horsePosition = new float[6];  // Percent, not really pixel 
        private static bool _inPlay;
        private const int distance = 1000;   // 奔跑距離

        public async Task Initialize()
        {
            await Clients.All.SendAsync("Preparing", _horsePosition);
        }

        public async Task Reset()
        {
            _inPlay = false;
            for(var i = 0; i < _horsePosition.Length; i++)
            {
                Volatile.Write(ref _horsePosition[i], 0.00f);
            }
            await Clients.All.SendAsync("ResetEvent");
        }

        public async Task Ready()
        {
            for(var timer=3; timer >= 0; timer--)
            {
                await Clients.All.SendAsync("ReadyEvent", timer);
                await Task.Delay(1000);
            }

            _inPlay = true;
        }

        public async Task MoveIt(int id, float step)
        {
            if(!_inPlay) return;
            var newPosition = Volatile.Read(ref _horsePosition[id]) + (step*100/distance);
            Volatile.Write(ref _horsePosition[id], newPosition);

            await Clients.All.SendAsync("ReceiveMove", id, newPosition);
            await Clients.All.SendAsync("ReceiveRank", CalculateRank());
            if(newPosition >= 88)
            {
                _inPlay = false;
                await Clients.All.SendAsync("GameOver", CalculateRank());
            }
        }

        private static int[] CalculateRank()
        {
            var rank = new [] {0,1,2,3,4,5};
            for(var i=0; i < _horsePosition.Length-1; i++)
            {
                for(var j=i+1; j < _horsePosition.Length; j++)
                {
                    if(_horsePosition[rank[i]] < _horsePosition[rank[j]])
                    {
                        var temp = rank[i];
                        rank[i] = rank[j];
                        rank[j] = temp;
                    }
                }
            }

            return rank;
        }
    }
}