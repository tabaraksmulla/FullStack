namespace ProductApi.Models
{
    public class Colour
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ProductColour> ProductColours { get; set; } = new();
    }
}
