using Microsoft.EntityFrameworkCore;
using NoteCode.Models;

namespace NoteCode.Data{
    public class AppDbContext: DbContext{
        public AppDbContext(DbContextOptions<AppDbContext>options): base(options){}
        public required DbSet<User> Users { get; set; }
        public DbSet<CodeNote> CodeNotes {get; set;}
    }
}