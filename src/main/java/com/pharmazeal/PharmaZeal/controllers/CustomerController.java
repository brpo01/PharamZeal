package com.pharmazeal.PharmaZeal.controllers;

import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.requests.NewCustomerRequestDTO;
import com.pharmazeal.PharmaZeal.services.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping( "/customer")
@AllArgsConstructor
@Validated
public class CustomerController {

    private  final CustomerService customerService;

    @PostMapping()
    public DefaultResponseDTO createProduct(@Valid @RequestBody NewCustomerRequestDTO data) {
        return this.customerService.createCustomer(data);
    }

    @GetMapping()
    public DefaultResponseDTO getAllCustomers() {
        return this.customerService.getAllCustomers();
    }

    @GetMapping("{id}")
    public DefaultResponseDTO getOneCustomer(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id) {
        return this.customerService.getOneCustomer(id);
    }

    @PutMapping("{id}")
    public DefaultResponseDTO updateCustomer(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id, @Valid @RequestBody NewCustomerRequestDTO data) {
        return this.customerService.updateCustomer(id, data);
    }

    @DeleteMapping("{id}")
    public DefaultResponseDTO deleteCustomer(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id) {
        return this.customerService.deleteCustomer(id);
    }
}
