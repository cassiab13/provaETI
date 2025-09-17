package com.prova.eti.controllers;

import com.prova.eti.entities.Acessorio;
import com.prova.eti.entities.Veiculo;
import com.prova.eti.repositories.VeiculoRepository;
import com.prova.eti.services.VeiculoService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculo")
public class VeiculoController {

    @Autowired
    private VeiculoService service;

    @GetMapping
    public ResponseEntity<List<Veiculo>> findAll(){
        List<Veiculo> veiculos = service.findAll();
        return ResponseEntity.ok().body(veiculos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> findById(@PathVariable Long id) {
        Veiculo veiculo = service.findById(id);
        return ResponseEntity.ok().body(veiculo);
    }

    @PostMapping
    public ResponseEntity<Veiculo> create(@RequestBody Veiculo veiculo){
        service.create(veiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(veiculo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> update(@RequestBody Veiculo veiculo, @PathVariable Long id){
        service.update(id, veiculo);
        return ResponseEntity.ok().body(veiculo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/add-acessorio")
    public ResponseEntity<Veiculo> addAcessorio(@PathVariable Long id, @RequestBody Acessorio acessorio){
        Veiculo veiculo = service.addAcessorio(id, acessorio);
        return ResponseEntity.ok().body(veiculo);
    }

    @DeleteMapping("/{veiculoId}/remove-acessorio/{acessorioId}")
    public ResponseEntity<Veiculo> removeAcessorio(@PathVariable Long veiculoId, @PathVariable Long acessorioId){
        Veiculo veiculo = service.removeAcessorio(veiculoId, acessorioId);
        return ResponseEntity.ok().body(veiculo);
    }
}
