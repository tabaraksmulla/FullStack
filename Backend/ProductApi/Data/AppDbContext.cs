using System.Drawing;
using Microsoft.EntityFrameworkCore;
using ProductApi.Models;

namespace ProductApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Colour> Colours { get; set; }
        public DbSet<ProductColour> ProductColours { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductColour>()
                .HasKey(pc => new { pc.ProductId, pc.ColourId });

            modelBuilder.Entity<ProductColour>()
                .HasOne(pc => pc.Product)
                .WithMany(p => p.ProductColours)
                .HasForeignKey(pc => pc.ProductId);

            modelBuilder.Entity<ProductColour>()
                .HasOne(pc => pc.Colour)
                .WithMany(c => c.ProductColours)
                .HasForeignKey(pc => pc.ColourId);
        }
    }
}
