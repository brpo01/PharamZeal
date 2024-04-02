package com.pharmazeal.PharmaZeal.dto.factories;

import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.SalesResponseDTO;
import com.pharmazeal.PharmaZeal.models.entities.Sales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class Sales_DTO_Factory {

    public DefaultResponseDTO createSalesListResponseDTO(List<SalesResponseDTO> data) {
        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage("Users fetched successfully.");
        response.setData(data);

        return response;
    }

    public DefaultResponseDTO createSalesResponseDTO(Sales sale, String message)
    {
        SalesResponseDTO saleDTO = new SalesResponseDTO(
                sale.getId(),
                sale.getCustomer().getId(),
                sale.getCustomer().getFull_name(),
                sale.getUser().getId(),
                sale.getUser().getFirstName(),
                sale.getQuantity(),
                sale.getTotal_price(),
                sale.getStore().getId(),
                sale.getStore().getName(),
                sale.getDrug().getId(),
                sale.getDrug().getDrugName(),
                sale.getDate_of_sale()
        );

        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage(message);

        Map<String, Object> data = new HashMap<>();
        data.put("sale", saleDTO);
        response.setData(data);

        return response;
    }

    public SalesResponseDTO createSaleDTO(Sales sale)
    {
        return new SalesResponseDTO(
                sale.getId(),
                sale.getCustomer().getId(),
                sale.getCustomer().getFull_name(),
                sale.getUser().getId(),
                sale.getUser().getFirstName(),
                sale.getQuantity(),
                sale.getTotal_price(),
                sale.getStore().getId(),
                sale.getStore().getName(),
                sale.getDrug().getId(),
                sale.getDrug().getDrugName(),
                sale.getDate_of_sale()
        );
    }

}
