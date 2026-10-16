namespace EcomApi.Dtos;

public record RegisterRequest(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    string ConfirmPassword,
    string PostalCode,
    string Street,
    string HouseNumber);
