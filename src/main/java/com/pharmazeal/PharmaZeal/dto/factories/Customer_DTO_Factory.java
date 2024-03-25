package com.pharmazeal.PharmaZeal.dto.factories;

import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.CustomerResponseDTO;
import com.pharmazeal.PharmaZeal.models.entities.Customer;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Customer_DTO_Factory {

    public DefaultResponseDTO createCustomerResponseDTO(Customer customer, String message)
    {

        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage(message);
        response.setData(customer);

        return response;
    }

    public DefaultResponseDTO createCustomerListResponseDTO(List<CustomerResponseDTO> data) {
        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage("Customer details fetched successfully.");
        response.setData(data);

        return response;
    }

    public CustomerResponseDTO createCustomerDto(Customer customer)
    {
        return new CustomerResponseDTO(
                customer.getId(),
                customer.getFull_name(),
                customer.getFirstname(),
                customer.getLastname(),
                customer.getGender(),
                customer.getAddress(),
                customer.getStore_name(),
                customer.getPostcode(),
                customer.getMedical_history(),
                customer.getAllergy(),
                customer.getDate_of_birth(),
                customer.getMobileNumber()
        );
    }
}
