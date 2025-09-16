package com.prova.eti.services;

import com.prova.eti.entities.Acessorio;
import com.prova.eti.repositories.AcessorioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcessorioService {

    @Autowired
    private AcessorioRepository repository;

    public Acessorio create(Acessorio acessorio){
        return repository.save(acessorio);
    }

    public List<Acessorio> findAll(){
        return repository.findAll();
    }

    public Acessorio findById(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Acessório não encontrado"));
    }

    public Acessorio update(Long id, Acessorio acessorio){
        Acessorio acessorio1 = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Acessório não encontrado"));

        acessorio1.setNome(acessorio.getNome());
        acessorio1.setVeiculo(acessorio.getVeiculo());
        return repository.save(acessorio1);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }
}
