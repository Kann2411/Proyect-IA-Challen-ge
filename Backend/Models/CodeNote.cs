using System.ComponentModel.DataAnnotations;

namespace NoteCode.Models
{
    public class CodeNote
    {
        public int Id {get; set;}

        [MaxLength(100, ErrorMessage = "El titulo no puede tener más de 100 caracteres")]
        public string? Title {get; set;}

        [Required(ErrorMessage = "El contenido del codigo es obligatorio")]
        public required string CodeContent {get; set;}

        public bool IsPublic {get; set;} = false;

        public int UserId {get; set;}
        public required User User {get; set;}
    }
}