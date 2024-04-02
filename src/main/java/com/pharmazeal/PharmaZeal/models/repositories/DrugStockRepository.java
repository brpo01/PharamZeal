package com.pharmazeal.PharmaZeal.models.repositories;

import com.pharmazeal.PharmaZeal.models.entities.DrugStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrugStockRepository extends JpaRepository<DrugStock, Integer> {
    DrugStock findByDrugName(String name);
}
