using NoteCode.Models;

namespace NoteCode.Services 
{
    public interface IRoleService 
    {
        void AssingRole(User user, bool isAdmin);
        bool IsUserAdmin(User user);
    }

    public class RoleService: IRoleService
    {
        public void AssingRole(User user, bool isAdmin)
        {
            user.IsAdmin = isAdmin;
        }
        public bool IsUserAdmin(User user)
        {
            return user.IsAdmin;
        }
    }
}