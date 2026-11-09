// Descriptors montados em runtime (sem protoc): o mesmo que o protoc-gen-es entregaria
// ao projeto consumidor para `wapigo.kit.v1` + um `ParceriaService` de exemplo.
import { create, createFileRegistry, type DescMessage, type DescService } from '@bufbuild/protobuf'
import {
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
  FileDescriptorProtoSchema,
  FileDescriptorSetSchema,
  file_google_protobuf_empty,
  file_google_protobuf_field_mask,
  file_google_protobuf_timestamp,
} from '@bufbuild/protobuf/wkt'

type T = FieldDescriptorProto_Type
const { STRING, INT32, INT64, BOOL, MESSAGE } = FieldDescriptorProto_Type
const REPEATED = FieldDescriptorProto_Label.REPEATED

function f(name: string, number: number, type: T, extra: Record<string, unknown> = {}) {
  // o protoc sempre preenche json_name (lowerCamelCase)
  const jsonName = name.replace(/_(\w)/g, (_, c: string) => c.toUpperCase())
  return { name, jsonName, number, type, label: FieldDescriptorProto_Label.OPTIONAL, ...extra }
}

const rpcFile = create(FileDescriptorProtoSchema, {
  name: 'google/rpc/error_details.proto',
  package: 'google.rpc',
  syntax: 'proto3',
  messageType: [
    {
      name: 'BadRequest',
      field: [
        f('field_violations', 1, MESSAGE, {
          label: REPEATED,
          typeName: '.google.rpc.BadRequest.FieldViolation',
        }),
      ],
      nestedType: [
        { name: 'FieldViolation', field: [f('field', 1, STRING), f('description', 2, STRING)] },
      ],
    },
  ],
})

const kitFile = create(FileDescriptorProtoSchema, {
  name: 'wapigo/kit/v1/common.proto',
  package: 'wapigo.kit.v1',
  syntax: 'proto3',
  messageType: [
    {
      name: 'ListRequest',
      field: [
        f('filtros', 1, MESSAGE, {
          label: REPEATED,
          typeName: '.wapigo.kit.v1.ListRequest.FiltrosEntry',
        }),
        f('ordem', 2, STRING, { label: REPEATED }),
        f('pagina', 3, INT32),
        f('tamanho', 4, INT32),
        f('busca', 5, STRING),
      ],
      nestedType: [
        {
          name: 'FiltrosEntry',
          field: [f('key', 1, STRING), f('value', 2, STRING)],
          options: { mapEntry: true },
        },
      ],
    },
    { name: 'IdRequest', field: [f('id', 1, STRING)] },
  ],
})

const parceriaFile = create(FileDescriptorProtoSchema, {
  name: 'app/v1/parceria.proto',
  package: 'app.v1',
  syntax: 'proto3',
  dependency: [
    'wapigo/kit/v1/common.proto',
    'google/protobuf/timestamp.proto',
    'google/protobuf/field_mask.proto',
    'google/protobuf/empty.proto',
  ],
  messageType: [
    {
      name: 'Parceria',
      field: [
        f('id', 1, STRING),
        f('nome', 2, STRING),
        f('data_inicio', 3, MESSAGE, { typeName: '.google.protobuf.Timestamp' }),
        f('valor', 4, STRING),
        f('qtd_total', 5, INT64),
        f('ativo', 6, BOOL),
        f('prioridade', 7, INT32),
      ],
    },
    {
      name: 'ListParceriasResponse',
      field: [
        f('count', 1, INT64),
        f('results', 2, MESSAGE, { label: REPEATED, typeName: '.app.v1.Parceria' }),
      ],
    },
    {
      name: 'CreateParceriaRequest',
      field: [
        f('nome', 1, STRING),
        f('data_inicio', 2, MESSAGE, { typeName: '.google.protobuf.Timestamp' }),
        f('valor', 3, STRING),
      ],
    },
    {
      name: 'UpdateParceriaRequest',
      field: [
        f('id', 1, STRING),
        f('parceria', 2, MESSAGE, { typeName: '.app.v1.Parceria' }),
        f('update_mask', 3, MESSAGE, { typeName: '.google.protobuf.FieldMask' }),
      ],
    },
    // Create embrulhado (Create<X>Request { <x> = 1 }), como o CrmContato da api2.
    {
      name: 'CreateWrappedRequest',
      field: [f('parceria', 1, MESSAGE, { typeName: '.app.v1.Parceria' })],
    },
  ],
  service: [
    {
      name: 'WrappedService',
      method: [
        {
          name: 'Create',
          inputType: '.app.v1.CreateWrappedRequest',
          outputType: '.app.v1.Parceria',
        },
      ],
    },
    {
      name: 'ParceriaService',
      method: [
        {
          name: 'List',
          inputType: '.wapigo.kit.v1.ListRequest',
          outputType: '.app.v1.ListParceriasResponse',
        },
        { name: 'Get', inputType: '.wapigo.kit.v1.IdRequest', outputType: '.app.v1.Parceria' },
        {
          name: 'Create',
          inputType: '.app.v1.CreateParceriaRequest',
          outputType: '.app.v1.Parceria',
        },
        {
          name: 'Update',
          inputType: '.app.v1.UpdateParceriaRequest',
          outputType: '.app.v1.Parceria',
        },
        {
          name: 'Delete',
          inputType: '.wapigo.kit.v1.IdRequest',
          outputType: '.google.protobuf.Empty',
        },
        { name: 'Aprovar', inputType: '.wapigo.kit.v1.IdRequest', outputType: '.app.v1.Parceria' },
      ],
    },
  ],
})

// Os .proto bem-conhecidos entram pela forma de FileDescriptorProto (`toBinary` do descriptor embutido).
const wkt = [
  file_google_protobuf_timestamp,
  file_google_protobuf_field_mask,
  file_google_protobuf_empty,
].map((d) => d.proto)
const registry = createFileRegistry(
  create(FileDescriptorSetSchema, { file: [...wkt, rpcFile, kitFile, parceriaFile] }),
)

export const ParceriaService = registry.getService('app.v1.ParceriaService') as DescService
export const ParceriaSchema = registry.getMessage('app.v1.Parceria') as DescMessage
export const ListParceriasResponseSchema = registry.getMessage(
  'app.v1.ListParceriasResponse',
) as DescMessage
export const BadRequestSchema = registry.getMessage('google.rpc.BadRequest') as DescMessage
export const WrappedService = registry.getService('app.v1.WrappedService') as DescService
