package com.pharmazeal.PharmaZeal.models.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="store")

public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String address;

    private String postcode;

    private String mobile_number;

    @JsonManagedReference
    @OneToMany(mappedBy="store")
    @OrderBy(value="id")
    private List<Sales> sales = new ArrayList<>();

}
