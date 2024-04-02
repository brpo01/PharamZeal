package com.pharmazeal.PharmaZeal.dto.factories;

import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.DrugResponseDTO;
import com.pharmazeal.PharmaZeal.models.entities.Drug;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Drug_DTO_Factory {

    public DefaultResponseDTO createDrugResponseDTO(Drug drug, String message)
    {

        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage(message);
        response.setData(drug);

        return response;
    }

    public DefaultResponseDTO createDrugListResponseDTO(List<DrugResponseDTO> data) {
        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage("Customer details fetched successfully.");
        response.setData(data);

        return response;
    }

    public DrugResponseDTO createDrugDto(Drug drug)
    {
        return new DrugResponseDTO(
                drug.getId(),
                drug.getDrug_code(),
                drug.getDrugName(),
                drug.getCustomer_condition(),
                drug.isIdCheck(),
                drug.getStore(),
                drug.getPostcode(),
                drug.getAvailable_stock(),
                drug.getPrice(),
                drug.getExpiry_date(),
                drug.isAvailability()
        );
    }
}
