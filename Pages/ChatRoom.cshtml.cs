using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace SlimeRacing.Pages
{
    public class ChatRoomModel : PageModel
    {
        private readonly ILogger<ChatRoomModel> _logger;

        public ChatRoomModel(ILogger<ChatRoomModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}