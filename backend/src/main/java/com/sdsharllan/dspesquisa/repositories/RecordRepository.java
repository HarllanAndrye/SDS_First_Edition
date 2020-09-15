package com.sdsharllan.dspesquisa.repositories;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sdsharllan.dspesquisa.entities.Record;

/*
 * JpaRepository<T, ID>
 * 		T: é o tipo da entidade.
 * 		ID: é o tipo do id da entidade.
 * */
@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

	/*
	 * Consulta usando a linguagem JPQL.
	 * Após o "FROM" colocar o nome "exato" da classe.
	 * coalesce: utilizado por cauda do BD Postgres.
	 * */
	@Query("SELECT obj FROM Record obj WHERE "
			+ "(coalesce(:min, null) IS NULL OR obj.moment >= :min) AND "
			+ "(coalesce(:max, null) IS NULL OR obj.moment <= :max)") 
	Page<Record> findByMoments(Instant min, Instant max, Pageable pageable);

}
