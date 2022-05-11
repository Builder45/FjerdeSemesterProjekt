using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response.Product);
        }

        // GET => URL/api/Products?pageSize=10&pageNumber=1
        [AllowAnonymous]
        [HttpGet()]
        public async Task<IActionResult> GetProducts([FromQuery] QueryRequest queryRequest)
        {
            var response = await _productService.GetProductsAsync(queryRequest);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response.Products);
        }

        // POST => URL/api/Products
        [Authorize(Roles = "Admin")]
        [HttpPost()]
        public async Task<IActionResult> CreateProduct(UpdateProductRequest updateProductRequest)
        {
            var response = await _productService.CreateProductAsync(updateProductRequest);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok();
        }

        // PUT => URL/api/Products
        [Authorize(Roles = "Admin")]
        [HttpPut()]
        public async Task<IActionResult> UpdateProduct(UpdateProductRequest updateProductRequest)
        {
            var response = await _productService.UpdateProductAsync(updateProductRequest);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok();
        }

        // DELETE => URL/api/Products
        [Authorize(Roles = "Admin")]
        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] string productId)
        {
            var response = await _productService.DeleteProductAsync(productId);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok();
        }
    }
}
