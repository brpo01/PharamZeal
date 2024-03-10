package com.pharmazeal.PharmaZeal.models.repositories;

import com.pharmazeal.PharmaZeal.models.entities.Tunstall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TunstallRepository extends JpaRepository<Tunstall, Integer> {
    Tunstall findById(int id);
}
