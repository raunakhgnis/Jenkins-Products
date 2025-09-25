package com.klef.backend.controller;

import com.klef.backend.model.Product;
import com.klef.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return repository.save(product);
    }
    
    @GetMapping("/klu")
    public String check() {
    	return "<h1>checking jenkins<h1>";
    }
    
    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        return repository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setDescription(updatedProduct.getDescription());
            return repository.save(product);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
