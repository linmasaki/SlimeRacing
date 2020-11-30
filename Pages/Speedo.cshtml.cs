using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SlimeRacing.Pages
{
    public class SpeedoModel : PageModel
    {
        public SpeedoModel()
        {

        }

        public int Id { get; set; }
        public void OnGet(int id)
        {
            Id = id;
        }
    }
}