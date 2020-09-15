package com.sdsharllan.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdsharllan.dspesquisa.entities.Record;

/*
 * JpaRepository<T, ID>
 * 		T: é o tipo da entidade.
 * 		ID: é o tipo do id da entidade.
 * */
@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

}
