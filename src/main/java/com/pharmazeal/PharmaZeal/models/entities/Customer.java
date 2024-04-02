package com.pharmazeal.PharmaZeal.models.entities;

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
@Table(name="customer")

public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String full_name;

    private String firstname;

    private String lastname;

    private String gender;

    private String address;

    private String store_name;

    private String postcode;

    private String medical_history;

    private String allergy;

    private LocalDate date_of_birth;

    private String mobileNumber;

    @OneToMany(mappedBy="customer")
    @OrderBy(value="id")
    private List<Sales> sales = new ArrayList<>();
}
