using System.ComponentModel.DataAnnotations;

public class UserDto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Username is required")]
    public required string Username { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email")]
    public required string Email { get; set; }
    public bool? IsAdmin { get; set; }
    public string? ImageProfile { get; set; }
}
