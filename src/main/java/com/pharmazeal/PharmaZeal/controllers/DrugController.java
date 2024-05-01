package com.pharmazeal.PharmaZeal.controllers;

import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.requests.NewDrugRequestDTO;
import com.pharmazeal.PharmaZeal.services.DrugService;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping( "/drug")
@AllArgsConstructor
@Validated
public class DrugController {

    private  final DrugService drugService;

    @PostMapping()
    public DefaultResponseDTO createDrug(@Valid @RequestBody NewDrugRequestDTO data) {
        return this.drugService.createDrug(data);
    }

    @GetMapping()
    public DefaultResponseDTO getAllDrugs() {
        return this.drugService.getAllDrugs();
    }

    @GetMapping("{id}")
    public DefaultResponseDTO getOneDrug(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id) {
        return this.drugService.getOneDrug(id);
    }

    @PutMapping("{id}")
    public DefaultResponseDTO updateDrug(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id, @Valid @RequestBody NewDrugRequestDTO data) {
        return this.drugService.updateDrug(id, data);
    }

    @DeleteMapping("{id}")
    public DefaultResponseDTO deleteDrug(
            @Min(value = 1, message = "Id must be greater than zero")
            @PathVariable(name = "id") int id) {
        return this.drugService.deleteDrug(id);
    }
}
