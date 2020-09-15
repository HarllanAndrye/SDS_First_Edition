package com.sdsharllan.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdsharllan.dspesquisa.entities.Genre;

/*
 * JpaRepository<T, ID>
 * 		T: é o tipo da entidade.
 * 		ID: é o tipo do id da entidade.
 * */
public interface GenreRepository extends JpaRepository<Genre, Long> {

}
