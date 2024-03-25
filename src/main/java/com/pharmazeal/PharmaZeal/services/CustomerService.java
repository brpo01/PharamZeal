package com.pharmazeal.PharmaZeal.services;

import com.pharmazeal.PharmaZeal.dto.requests.NewCustomerRequestDTO;
import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.CustomerResponseDTO;
import com.pharmazeal.PharmaZeal.models.entities.Customer;
import com.pharmazeal.PharmaZeal.exceptions.CustomException;
import com.pharmazeal.PharmaZeal.dto.factories.Customer_DTO_Factory;
import com.pharmazeal.PharmaZeal.models.repositories.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class CustomerService {

    private final Customer_DTO_Factory customerMapper;
    private final CustomerRepository customerRepository;

    public DefaultResponseDTO createCustomer(NewCustomerRequestDTO data) {
        Customer checkCustomer = this.customerRepository.findByMobileNumber(data.getMobileNumber());

        if(checkCustomer != null) throw new CustomException("Customer with this mobile number already exists.", 400, HttpStatus.OK);

        Customer newCustomer = new Customer();

        newCustomer.setFull_name(data.getFull_name());
        newCustomer.setFirstname(data.getFirstname());
        newCustomer.setLastname(data.getLastname());
        newCustomer.setGender(data.getGender());
        newCustomer.setAddress(data.getAddress());
        newCustomer.setStore_name(data.getStore_name());
        newCustomer.setPostcode(data.getPost_code());
        newCustomer.setMedical_history(data.getMedical_history());
        newCustomer.setAllergy(data.getAllergy());
        newCustomer.setDate_of_birth(data.getDate_of_birth());
        newCustomer.setMobileNumber(data.getMobileNumber());

        this.customerRepository.save(newCustomer);

        return this.customerMapper.createCustomerResponseDTO(newCustomer, "New Customer creation successful.");
    }

    public DefaultResponseDTO getAllCustomers() {
        List<CustomerResponseDTO> list = new ArrayList<>();
        List<Customer> customers = this.customerRepository.findAll();

        for (Customer customer : customers)
        {
            CustomerResponseDTO productDto = this.customerMapper.createCustomerDto(customer);
            list.add(productDto);
        }

        return this.customerMapper.createCustomerListResponseDTO(list);
    }

    public DefaultResponseDTO getOneCustomer(int customerId) {

        Customer customer = this.customerRepository.findById(customerId).orElse(null);
        if(customer == null) throw new CustomException("Customer does not exist.", 400, HttpStatus.OK);

        return this.customerMapper.createCustomerResponseDTO(customer, "Customer details fetched successful.");
    }

    public DefaultResponseDTO updateCustomer(int customerId, NewCustomerRequestDTO updateCustomer) {

        // Check if customer id exists
        Customer customer = this.customerRepository.findById(customerId).orElse(null);
        if(customer == null) throw new CustomException("Product does not exist.", 400, HttpStatus.OK);

        // Check if customer has a mobile number
        Customer checkCustomer = this.customerRepository.findByMobileNumber(updateCustomer.getMobileNumber());
        if(checkCustomer != null && checkCustomer.getId() != customerId) {
            throw new CustomException("Product with name already exists.", 400, HttpStatus.OK);
        }

        customer.setFull_name(updateCustomer.getFull_name());
        customer.setFirstname(updateCustomer.getFirstname());
        customer.setLastname(updateCustomer.getLastname());
        customer.setGender(updateCustomer.getGender());
        customer.setAddress(updateCustomer.getAddress());
        customer.setStore_name(updateCustomer.getStore_name());
        customer.setPostcode(updateCustomer.getPost_code());
        customer.setMedical_history(updateCustomer.getMedical_history());
        customer.setAllergy(updateCustomer.getAllergy());
        customer.setDate_of_birth(updateCustomer.getDate_of_birth());
        customer.setMobileNumber(updateCustomer.getMobileNumber());

        this.customerRepository.save(customer);

        return this.customerMapper.createCustomerResponseDTO(customer, "Customer updated successfully.");

    }

    public DefaultResponseDTO deleteCustomer(int customerId) {

        Customer customer = this.customerRepository.findById(customerId).orElse(null);
        if(customer == null) throw new CustomException("Customer does not exist.", 400, HttpStatus.OK);

        this.customerRepository.deleteById(customerId);

        return new DefaultResponseDTO(200, "Product deleted successfully.");
    }


}
