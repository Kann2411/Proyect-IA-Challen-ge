using System.ComponentModel.DataAnnotations;

namespace NoteCode.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo Username es requerido")]
        public required string Username { get; set; }
        [Required(ErrorMessage = "El campo Email es requerido")]
        [EmailAddress(ErrorMessage = "El campo Email debe ser un correo electrónico válido")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "La Password es requerida")]
        [MinLength(8, ErrorMessage = "La Password debe tener al menos 8 caracteres")]
        public required string PasswordHash { get; set; }

        public string? ImageProfile {get; set;}

        public string? Role { get; set; } = "user";
    }
}