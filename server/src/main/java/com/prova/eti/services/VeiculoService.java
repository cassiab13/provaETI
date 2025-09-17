package com.prova.eti.services;

import com.prova.eti.entities.Acessorio;
import com.prova.eti.entities.Veiculo;
import com.prova.eti.repositories.AcessorioRepository;
import com.prova.eti.repositories.VeiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository repository;

    @Autowired
    private AcessorioRepository acessorioRepository;

    public Veiculo create(Veiculo veiculo){
        return repository.save(veiculo);
    }

    public List<Veiculo> findAll(){
        return repository.findAll();
    }

    public Veiculo findById(Long id){
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado"));
    }

    public Veiculo update(Long id, Veiculo veiculo){
        Veiculo veiculo1 = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado"));

        veiculo1.setModelo(veiculo.getModelo());
        veiculo1.setAnoFabricacao(veiculo.getAnoFabricacao());
        veiculo1.setPlaca(veiculo.getPlaca());
        return repository.save(veiculo1);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Veiculo addAcessorio(Long id, Acessorio acessorio){
        Veiculo veiculo = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado"));
        List<Acessorio> acessorios = veiculo.getAcessorios();
        acessorioRepository.save(acessorio);
        acessorios.add(acessorio);
        return veiculo;
    }

    public Veiculo removeAcessorio(Long idVeiculo, Long idAcessorio){
        Veiculo veiculo = repository.findById(idVeiculo)
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado"));
        Acessorio acessorio = acessorioRepository.findById(idAcessorio)
                .orElseThrow(() -> new EntityNotFoundException("Acessório não encontrado"));
        veiculo.getAcessorios().remove(acessorio);
        repository.save(veiculo);
        return veiculo;
    }

}

