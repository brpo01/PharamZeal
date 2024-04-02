package com.pharmazeal.PharmaZeal.dto.factories;

import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.DrugStockResponseDTO;
import com.pharmazeal.PharmaZeal.models.entities.DrugStock;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DrugStock_DTO_Factory {

    public DefaultResponseDTO createDrugStockResponseDTO(DrugStock drugstock, String message)
    {

        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage(message);
        response.setData(drugstock);

        return response;
    }

    public DefaultResponseDTO createDrugStockListResponseDTO(List<DrugStockResponseDTO> data) {
        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage("Customer details fetched successfully.");
        response.setData(data);

        return response;
    }

    public DrugStockResponseDTO createDrugStockDto(DrugStock drug)
    {
        return new DrugStockResponseDTO(
                drug.getId(),
                drug.getDrug_code(),
                drug.getDrugName(),
                drug.getTotal_stock(),
                drug.getExpiry_date()
        );
    }
}
