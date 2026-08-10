{
  "title": "リピーター限定15%OFFクーポン - {{ getCustomerDataForeachitem.id | remove: 'gid://shopify/Customer/' }}",
  "code": "KomonsRtn-{{ getCustomerDataForeachitem.id | remove: 'gid://shopify/Customer/' }}",
  "startsAt": "{{ 'now' | date: '%Y-%m-%dT%H:%M:%S%z' }}",
  "endsAt": "{{ 'now' | date: '%s' | plus: 1209600 | date: '%Y-%m-%dT%H:%M:%S%z' }}",
  "customerSelection": {
    "customers": {
      "add": [
        "{{ getCustomerDataForeachitem.id }}"
      ]
    }
  },
  "customerGets": {
    "value": {
      "percentage": 0.15
    },
    "items": {
      "all": true
    }
  },
  "appliesOncePerCustomer": true
}



{
  "basicCodeDiscount": {
    "title": "初回購入者限定10%OFFクーポン - {{ order.customer.id | remove: 'gid://shopify/Customer/' }}",
    "code": "Komons1st-{{ order.customer.id | remove: 'gid://shopify/Customer/' }}",
    "startsAt": "{{ 'now' | date: '%Y-%m-%dT%H:%M:%S%z' }}",
    "endsAt": "{{ 'now' | date: '%s' | plus: 1728000 | date: '%Y-%m-%dT%H:%M:%S%z' }}",
    "customerSelection": {
      "customers": {
        "add": [
          "{{ order.customer.id }}"
        ]
      }
    },
    "customerGets": {
      "value": {
        "percentage": 0.1
      },
      "items": {
        "all": true
      }
    },
    "appliesOncePerCustomer": true
  }
}
