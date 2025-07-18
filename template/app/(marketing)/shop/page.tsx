import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatSwissPrice } from '@/lib/plans'
import { ShoppingCart, Star } from 'lucide-react'

export default function ShopPage() {
  // Demo products - in real app these would come from database
  const products = [
    {
      id: 1,
      name: 'Premium T-Shirt',
      price: 2900, // €29.00 in cents
      originalPrice: 3900,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      description: 'High-quality cotton t-shirt with modern design',
      rating: 4.8,
      reviews: 124,
      sale: true,
    },
    {
      id: 2,
      name: 'Designer Hoodie',
      price: 5900, // €59.00 in cents
      image: 'https://images.unsplash.com/photo-1556821840-3a9c6e65d9b2?w=400&h=400&fit=crop',
      description: 'Comfortable hoodie perfect for casual wear',
      rating: 4.6,
      reviews: 89,
      sale: false,
    },
    {
      id: 3,
      name: 'Classic Jeans',
      price: 7900, // €79.00 in cents
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      description: 'Durable denim jeans with perfect fit',
      rating: 4.9,
      reviews: 203,
      sale: false,
    },
    {
      id: 4,
      name: 'Sport Sneakers',
      price: 8900, // €89.00 in cents
      originalPrice: 12900,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      description: 'Comfortable sneakers for everyday activities',
      rating: 4.7,
      reviews: 156,
      sale: true,
    },
    {
      id: 5,
      name: 'Elegant Watch',
      price: 14900, // €149.00 in cents
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
      description: 'Stylish watch with premium materials',
      rating: 4.9,
      reviews: 67,
      sale: false,
    },
    {
      id: 6,
      name: 'Leather Bag',
      price: 9900, // €99.00 in cents
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      description: 'Premium leather bag for professionals',
      rating: 4.8,
      reviews: 91,
      sale: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Our Products
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collection of high-quality products designed for modern living.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.sale && (
                  <Badge className="absolute top-3 left-3 bg-red-500">
                    Sale
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              
              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
              <CardDescription className="mb-4">{product.description}</CardDescription>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">
                    {formatSwissPrice(product.price / 100)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatSwissPrice(product.originalPrice / 100)}
                    </span>
                  )}
                </div>
                
                <Button size="sm" className="ml-4">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-lg text-muted-foreground mb-6">
          Can&apos;t find what you&apos;re looking for?
        </p>
        <Button variant="outline" size="lg">
          Contact Support
        </Button>
      </div>
    </div>
  )
}