package com.pharmazeal.PharmaZeal.controllers;

import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.requests.NewDrugStockRequestDTO;
import com.pharmazeal.PharmaZeal.services.DrugStockService;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping( "/drug_stock")
@AllArgsConstructor
@Validated
public class DrugStockController {

    private  final DrugStockService drugStockService;

    @PostMapping()
    public DefaultResponseDTO createDrugStock(@Valid @RequestBody NewDrugStockRequestDTO data) {
        return this.drugStockService.createDrugStock(data);
    }

    @GetMapping()
    public DefaultResponseDTO getAllDrugsStock() {
        return this.drugStockService.getAllDrugStock();
    }

    @GetMapping("{id}")
    public DefaultResponseDTO getOneDrugFromStock(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id) {
        return this.drugStockService.getOneDrug(id);
    }

    @PutMapping("{id}")
    public DefaultResponseDTO updateDrugStock(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id, @Valid @RequestBody NewDrugStockRequestDTO data) {
        return this.drugStockService.updateDrugStock(id, data);
    }

    @DeleteMapping("{id}")
    public DefaultResponseDTO deleteDrugFromStock(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id) {
        return this.drugStockService.deleteDrug(id);
    }
}
