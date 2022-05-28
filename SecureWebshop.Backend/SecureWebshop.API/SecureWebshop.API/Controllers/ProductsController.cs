using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecureWebshop.Application.Requests;
using SecureWebshop.Application.Requests.Products;
using SecureWebshop.Application.Services.Products;

namespace SecureWebshop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : BaseApiController
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        // GET => URL/api/Products/{productId}
        [AllowAnonymous]
        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProduct([FromRoute] string productId)
        {
            var response = await _productService.GetProductAsync(productId);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        // GET => URL/api/Products?pageSize=10&pageNumber=1&search=searchTerm
        [AllowAnonymous]
        [HttpGet()]
        public async Task<IActionResult> GetProducts([FromQuery] QueryRequest request)
        {
            var response = await _productService.GetProductsAsync(request);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        // GET => URL/api/Products/Full
        [Authorize(Roles = "Admin")]
        [HttpGet("Full")]
        public async Task<IActionResult> GetProductsFull([FromQuery] QueryRequest request)
        {
            var response = await _productService.GetProductsAsync(request, true);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        // POST => URL/api/Products
        [Authorize(Roles = "Admin")]
        [HttpPost()]
        public async Task<IActionResult> CreateProduct(UpdateProductRequest request)
        {
            var response = await _productService.CreateProductAsync(request);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        // POST => URL/api/Products/Dummy
        [Authorize(Roles = "Admin")]
        [HttpPost("Dummy")]
        public async Task<IActionResult> CreateDummyProduct()
        {
            var response = await _productService.CreateDummyProductAsync();

            return response != "" ? Ok(response) : BadRequest("Error");
        }

        // PUT => URL/api/Products
        [Authorize(Roles = "Admin")]
        [HttpPut()]
        public async Task<IActionResult> UpdateProduct(UpdateProductRequest request)
        {
            var response = await _productService.UpdateProductAsync(request);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        // PUT => URL/api/Products/{productId}/Toggle
        [Authorize(Roles = "Admin")]
        [HttpPut("{productId}/Toggle")]
        public async Task<IActionResult> UpdateProductStatus([FromRoute] string productId)
        {
            var response = await _productService.ToggleProductAsync(productId);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        // DELETE => URL/api/Products/{productId}
        [Authorize(Roles = "Admin")]
        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] string productId)
        {
            var response = await _productService.DeleteProductAsync(productId);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        // PUT => URL/api/Products/{productId}/Reviews
        [Authorize]
        [HttpPut("{productId}/Reviews")]
        public async Task<IActionResult> UpdateProductReview([FromRoute] string productId, [FromBody] UpdateProductReviewsRequest request)
        {
            request.ProductId = productId;
            request.UserId = UserId;

            var response = await _productService.UpdateProductReviewsAsync(request);

            return response.Success ? Ok(response) : BadRequest(response);
        }
    }
}
