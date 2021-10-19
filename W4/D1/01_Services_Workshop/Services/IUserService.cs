using System.Linq;
using Microsoft.AspNetCore.Identity;
using _01_Services_Workshop.Models;

namespace _01_Services_Workshop.Services 
{
    public interface IUserService 
    {
        int Login(LoginUser user);
    }

    public class UserService : IUserService 
    {
        private MyContext _context { get; set; }

        public UserService(MyContext context)
        {
            _context = context;
        }
        public int Login(LoginUser user)
        {
            User inDb = _context.Users.FirstOrDefault(u => u.Email == user.LogEmail);

            if(inDb == null)
            {
                return -1;
            }

            PasswordHasher<LoginUser> hasher = new PasswordHasher<LoginUser>();

            var result = hasher.VerifyHashedPassword(user, inDb.Password, user.LogPassword);

            if(result == 0)
            {
                return -1;
            }

            return inDb.UserId;
        }
    }
}