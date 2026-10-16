namespace EcomApi.Dtos;

public record AddToCartRequest(int ProductId, string Size, int Quantity);
