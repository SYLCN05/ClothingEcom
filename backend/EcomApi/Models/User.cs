namespace EcomApi.Models;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    // always stored lowercase + trimmed
    public string Email { get; set; } = string.Empty;

    // "{iterations}.{saltBase64}.{hashBase64}"
    public string PasswordHash { get; set; } = string.Empty;

    public string PostalCode { get; set; } = string.Empty;
    public string Street { get; set; } = string.Empty;
    public string HouseNumber { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    public List<CartItem> CartItems { get; set; } = [];
}
