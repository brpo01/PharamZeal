package com.pharmazeal.PharmaZeal.services;

import com.pharmazeal.PharmaZeal.dto.requests.NewDrugStockRequestDTO;
import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.DrugStockResponseDTO;
import com.pharmazeal.PharmaZeal.models.entities.DrugStock;
import com.pharmazeal.PharmaZeal.exceptions.CustomException;
import com.pharmazeal.PharmaZeal.dto.factories.DrugStock_DTO_Factory;
import com.pharmazeal.PharmaZeal.models.repositories.DrugStockRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class DrugStockService {

    private final DrugStock_DTO_Factory drugStockMapper;
    private final DrugStockRepository drugStockRepository;

    public DefaultResponseDTO createDrugStock(NewDrugStockRequestDTO data) {
        DrugStock checkDrugStock = this.drugStockRepository.findByDrugName(data.getDrugName());

        if(checkDrugStock != null) throw new CustomException("Drug with this name already exists.", 400, HttpStatus.OK);

        DrugStock newDrugStock = new DrugStock();

        newDrugStock.setDrug_code(data.getDrug_code());
        newDrugStock.setDrugName(data.getDrugName());
        newDrugStock.setTotal_stock(data.getTotal_stock());
        newDrugStock.setExpiry_date(data.getExpiry_date());

        this.drugStockRepository.save(newDrugStock);

        return this.drugStockMapper.createDrugStockResponseDTO(newDrugStock, "New Drug creation successful.");
    }

    public DefaultResponseDTO getAllDrugStock() {
        List<DrugStockResponseDTO> list = new ArrayList<>();
        List<DrugStock> drugStock = this.drugStockRepository.findAll();

        for (DrugStock drug : drugStock)
        {
            DrugStockResponseDTO drugDto = this.drugStockMapper.createDrugStockDto(drug);
            list.add(drugDto);
        }

        return this.drugStockMapper.createDrugStockListResponseDTO(list);
    }

    public DefaultResponseDTO getOneDrug(int drugId) {

        DrugStock drug = this.drugStockRepository.findById(drugId).orElse(null);
        if(drug == null) throw new CustomException("Drug does not exist.", 400, HttpStatus.OK);

        return this.drugStockMapper.createDrugStockResponseDTO(drug, "Drug details fetched successful.");
    }

    public DefaultResponseDTO updateDrugStock(int drugId, NewDrugStockRequestDTO updateDrugStock) {

        // Check if drug id exists
        DrugStock drug = this.drugStockRepository.findById(drugId).orElse(null);
        if(drug == null) throw new CustomException("Drug does not exist.", 400, HttpStatus.OK);

        // Check if drug has a name
        DrugStock checkDrugStock = this.drugStockRepository.findByDrugName(updateDrugStock.getDrugName());
        if(checkDrugStock != null && checkDrugStock.getId() != drugId) {
            throw new CustomException("Drug with name already exists.", 400, HttpStatus.OK);
        }

        drug.setDrug_code(updateDrugStock.getDrug_code());
        drug.setDrugName(updateDrugStock.getDrugName());
        drug.setTotal_stock(updateDrugStock.getTotal_stock());
        drug.setExpiry_date(updateDrugStock.getExpiry_date());

        this.drugStockRepository.save(drug);

        return this.drugStockMapper.createDrugStockResponseDTO(drug, "Drug in stock updated successfully.");

    }

    public DefaultResponseDTO deleteDrug(int drugId) {

        DrugStock drug = this.drugStockRepository.findById(drugId).orElse(null);
        if(drug == null) throw new CustomException("Drug does not exist.", 400, HttpStatus.OK);

        this.drugStockRepository.deleteById(drugId);

        return new DefaultResponseDTO(200, "Drug deleted from stock successfully.");
    }


}
