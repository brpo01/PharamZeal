package com.pharmazeal.PharmaZeal.models.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;



@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="sales")

public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "customer", nullable = false)
    private Customer customer;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;

    private int quantity;

    private double total_price;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "store", nullable = false)
    private Store store;

    @JsonManagedReference
    @OneToMany(mappedBy="sale")
    @OrderBy(value="id")
    private List<Drug> drugs = new ArrayList<>();

    private LocalDate date_of_sale;

    public void addDrug(Drug drug) {
        drugs.add(drug);
        drug.setSale(this);
    }

}
