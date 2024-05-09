package com.pharmazeal.PharmaZeal.services;

import com.pharmazeal.PharmaZeal.dto.requests.NewSaleRequestDTO;
import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.SalesResponseDTO;
import com.pharmazeal.PharmaZeal.models.entities.*;
import com.pharmazeal.PharmaZeal.exceptions.CustomException;
import com.pharmazeal.PharmaZeal.dto.factories.Sales_DTO_Factory;
import com.pharmazeal.PharmaZeal.models.repositories.CustomerRepository;
import com.pharmazeal.PharmaZeal.models.repositories.DrugRepository;
import com.pharmazeal.PharmaZeal.models.repositories.StoreRepository;
import com.pharmazeal.PharmaZeal.models.repositories.UserRepository;
import com.pharmazeal.PharmaZeal.models.repositories.SalesRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

@AllArgsConstructor
@Service
public class SaleService {

    private final Sales_DTO_Factory saleMapper;

    private final SalesRepository saleRepository;
    private final CustomerRepository customerRepository;
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final DrugRepository drugRepository;

    public DefaultResponseDTO createSale(NewSaleRequestDTO data) {

        // Create new sale
        Sales newSale = new Sales();
        newSale.setTotal_price(data.getTotal_price());
        newSale.setQuantity(data.getQuantity());
        newSale.setDate_of_sale(data.getDate_of_sale());

        // Set Customer
        Customer customer = this.customerRepository.findById(data.getCustomerId()).orElse(null);
        if (customer == null) return null;
        newSale.setCustomer(customer);

        // Set User
        User user = this.userRepository.findById(data.getUserId()).orElse(null);
        if (user == null) return null;
        newSale.setUser(user);

        // Set Store
        Store store = this.storeRepository.findById(data.getStoreId()).orElse(null);
        if (store == null) return null;
        newSale.setStore(store);

        // Set Drug
        List<Drug> drugs = new ArrayList<>();
        for (Integer drugId : data.getDrugId()) {
            Drug drug = drugRepository.findById(drugId).orElseThrow(() -> new CustomException("Drug not found", 404, HttpStatus.OK));
            drugs.add(drug);
            newSale.addDrug(drug);
        }

        this.saleRepository.save(newSale);

        return this.saleMapper.createSalesResponseDTO(newSale, "Sale of drug was processed successfully.");
    }


    public DefaultResponseDTO getAllSales() {

        List<SalesResponseDTO> list = new ArrayList<>();
        List<Sales> sales = this.saleRepository.findAll();


        for (Sales sale : sales)
        {
            SalesResponseDTO saleDTO = this.saleMapper.createSaleDTO(sale);
            list.add(saleDTO);
        }

        return this.saleMapper.createSalesListResponseDTO(list);
    }

    public DefaultResponseDTO getSaleDetails(int saleId) {

        Sales sale = this.saleRepository.findById(saleId).orElse(null);
        if(sale == null) throw new CustomException("sale does not exist.", 400, HttpStatus.OK);

        return this.saleMapper.createSalesResponseDTO(sale, "Sale details fetched successful.");
    }

}
