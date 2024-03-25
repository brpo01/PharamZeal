package com.pharmazeal.PharmaZeal.services;

import com.pharmazeal.PharmaZeal.dto.requests.NewDrugRequestDTO;
import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.DrugResponseDTO;
import com.pharmazeal.PharmaZeal.models.entities.Drug;
import com.pharmazeal.PharmaZeal.exceptions.CustomException;
import com.pharmazeal.PharmaZeal.dto.factories.Drug_DTO_Factory;
import com.pharmazeal.PharmaZeal.models.repositories.DrugRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class DrugService {

    private final Drug_DTO_Factory drugMapper;
    private final DrugRepository drugRepository;

    public DefaultResponseDTO createDrug(NewDrugRequestDTO data) {
        Drug checkDrug = this.drugRepository.findByDrugName(data.getDrugName());

        if(checkDrug != null) throw new CustomException("Drug with this name already exists.", 400, HttpStatus.OK);

        Drug newDrug = new Drug();

        newDrug.setDrug_code(data.getDrug_code());
        newDrug.setDrugName(data.getDrugName());
        newDrug.setCustomer_condition(data.getCustomer_condition());
        newDrug.setIdCheck(data.isId_check());
        newDrug.setStore(data.getStore());
        newDrug.setPostcode(data.getPostcode());
        newDrug.setAvailable_stock(data.getAvailable_stock());
        newDrug.setPrice(data.getPrice());
        newDrug.setExpiry_date(data.getExpiry_date());
        newDrug.setAvailability(data.isAvailability());

        this.drugRepository.save(newDrug);

        return this.drugMapper.createDrugResponseDTO(newDrug, "New Drug creation successful.");
    }

    public DefaultResponseDTO getAllDrugs() {
        List<DrugResponseDTO> list = new ArrayList<>();
        List<Drug> drugs = this.drugRepository.findAll();

        for (Drug drug : drugs)
        {
            DrugResponseDTO drugDto = this.drugMapper.createDrugDto(drug);
            list.add(drugDto);
        }

        return this.drugMapper.createDrugListResponseDTO(list);
    }

    public DefaultResponseDTO getOneDrug(int drugId) {

        Drug drug = this.drugRepository.findById(drugId).orElse(null);
        if(drug == null) throw new CustomException("Drug does not exist.", 400, HttpStatus.OK);

        return this.drugMapper.createDrugResponseDTO(drug, "Drug details fetched successful.");
    }

    public DefaultResponseDTO updateDrug(int drugId, NewDrugRequestDTO updateDrug) {

        // Check if drug id exists
        Drug drug = this.drugRepository.findById(drugId).orElse(null);
        if(drug == null) throw new CustomException("Drug does not exist.", 400, HttpStatus.OK);

        // Check if drug has a name
        Drug checkDrug = this.drugRepository.findByDrugName(updateDrug.getDrugName());
        if(checkDrug != null && checkDrug.getId() != drugId) {
            throw new CustomException("Drug with name already exists.", 400, HttpStatus.OK);
        }

        drug.setDrug_code(updateDrug.getDrug_code());
        drug.setDrugName(updateDrug.getDrugName());
        drug.setCustomer_condition(updateDrug.getCustomer_condition());
        drug.setIdCheck(updateDrug.isId_check());
        drug.setStore(updateDrug.getStore());
        drug.setPostcode(updateDrug.getPostcode());
        drug.setAvailable_stock(updateDrug.getAvailable_stock());
        drug.setPrice(updateDrug.getPrice());
        drug.setExpiry_date(updateDrug.getExpiry_date());
        drug.setAvailability(updateDrug.isAvailability());

        this.drugRepository.save(drug);

        return this.drugMapper.createDrugResponseDTO(drug, "Drug updated successfully.");

    }

    public DefaultResponseDTO deleteDrug(int drugId) {

        Drug drug = this.drugRepository.findById(drugId).orElse(null);
        if(drug == null) throw new CustomException("Drug does not exist.", 400, HttpStatus.OK);

        this.drugRepository.deleteById(drugId);

        return new DefaultResponseDTO(200, "Drug deleted successfully.");
    }


}
