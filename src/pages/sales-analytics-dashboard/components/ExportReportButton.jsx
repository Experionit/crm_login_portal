import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExportReportButton = ({ filters, activeView, language }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const languages = {
    en: {
      export: 'Export Report',
      exportOptions: 'Export Options',
      pdf: 'PDF Report',
      excel: 'Excel Spreadsheet',
      csv: 'CSV Data',
      png: 'PNG Image',
      includeCharts: 'Include Charts',
      includeData: 'Include Raw Data',
      includeSummary: 'Include Summary',
      dateRange: 'Date Range',
      filters: 'Applied Filters',
      exporting: 'Exporting...',
      exportSuccess: 'Report exported successfully',
      exportError: 'Failed to export report'
    },
    es: {
      export: 'Exportar Informe',
      exportOptions: 'Opciones de Exportación',
      pdf: 'Informe PDF',
      excel: 'Hoja de Cálculo Excel',
      csv: 'Datos CSV',
      png: 'Imagen PNG',
      includeCharts: 'Incluir Gráficos',
      includeData: 'Incluir Datos Brutos',
      includeSummary: 'Incluir Resumen',
      dateRange: 'Rango de Fechas',
      filters: 'Filtros Aplicados',
      exporting: 'Exportando...',
      exportSuccess: 'Informe exportado exitosamente',
      exportError: 'Error al exportar informe'
    }
  };

  const t = languages[language];

  const exportOptions = [
    {
      type: 'pdf',
      label: t.pdf,
      icon: 'FileText',
      description: 'Complete report with charts and data'
    },
    {
      type: 'excel',
      label: t.excel,
      icon: 'FileSpreadsheet',
      description: 'Data in Excel format for analysis'
    },
    {
      type: 'csv',
      label: t.csv,
      icon: 'Database',
      description: 'Raw data in CSV format'
    },
    {
      type: 'png',
      label: t.png,
      icon: 'Image',
      description: 'Charts as PNG images'
    }
  ];

  const handleExport = async (exportType) => {
    setIsExporting(true);
    setShowOptions(false);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would call an API to generate the report
      const reportData = {
        type: exportType,
        view: activeView,
        filters: filters,
        timestamp: new Date().toISOString(),
        language: language
      };
      
      // Simulate file download
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sales-analytics-${activeView}-${new Date().toISOString().split('T')[0]}.${exportType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log(t.exportSuccess);
    } catch (error) {
      console.error(t.exportError, error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setShowOptions(!showOptions)}
        disabled={isExporting}
        iconName={isExporting ? "Loader" : "Download"}
        className={isExporting ? "animate-spin" : ""}
      >
        {isExporting ? t.exporting : t.export}
      </Button>

      {showOptions && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
          
          {/* Options Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-elevation-3 z-50">
            <div className="p-4 border-b border-border">
              <h4 className="font-medium text-text-primary">{t.exportOptions}</h4>
            </div>
            
            <div className="p-4 space-y-3">
              {exportOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => handleExport(option.type)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name={option.icon} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-text-primary">{option.label}</div>
                    <div className="text-sm text-text-secondary">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-border bg-surface-secondary">
              <div className="text-sm text-text-secondary space-y-1">
                <div className="flex justify-between">
                  <span>{t.dateRange}:</span>
                  <span>{filters.dateRange}</span>
                </div>
                <div className="flex justify-between">
                  <span>View:</span>
                  <span>{activeView}</span>
                </div>
                <div className="flex justify-between">
                  <span>Territory:</span>
                  <span>{filters.territory}</span>
                </div>
                {filters.salesRep !== 'all' && (
                  <div className="flex justify-between">
                    <span>Sales Rep:</span>
                    <span>{filters.salesRep}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportReportButton;