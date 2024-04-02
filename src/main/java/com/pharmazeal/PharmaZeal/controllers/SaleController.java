package com.pharmazeal.PharmaZeal.controllers;

import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.services.SaleService;
import com.pharmazeal.PharmaZeal.dto.requests.NewSaleRequestDTO;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Min;

@RestController
@RequestMapping( "/sale")
@AllArgsConstructor
@Validated
public class SaleController {

    private SaleService saleService;

    @PostMapping()
    public DefaultResponseDTO createSale(@Valid @RequestBody NewSaleRequestDTO data) {
        return this.saleService.createSale(data);
    }

    @GetMapping()
    public DefaultResponseDTO getAllSales() {
        return this.saleService.getAllSales();
    }

    @GetMapping("{id}")
    public DefaultResponseDTO getOneSale(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id) {
        return this.saleService.getSaleDetails(id);
    }

}
